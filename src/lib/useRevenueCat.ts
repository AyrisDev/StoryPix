// lib/useRevenueCat.ts
import { useState, useEffect } from 'react';
import Purchases, { 
  PurchasesPackage,
  CustomerInfo 
} from 'react-native-purchases';
import { useCredits } from './useCredits';

const REVENUE_CAT_API_KEY = 'your_api_key';

export function useRevenueCat() {
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { addCredits } = useCredits();

  useEffect(() => {
    initializePurchases();
  }, []);

  const initializePurchases = async () => {
    try {
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
      await Purchases.configure({ apiKey: REVENUE_CAT_API_KEY });

      const offerings = await Purchases.getOfferings();
      if (offerings.current) {
        setPackages(offerings.current.availablePackages);
      }

      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);
    } catch (error) {
      console.error('RevenueCat initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const purchasePackage = async (pack: PurchasesPackage) => {
    try {
      const { customerInfo, productIdentifier } = await Purchases.purchasePackage(pack);
      setCustomerInfo(customerInfo);

      // Kredi miktarını belirle
      let creditsToAdd = 0;
      switch (productIdentifier) {
        case 'credits_10':
          creditsToAdd = 10;
          break;
        case 'credits_20':
          creditsToAdd = 20;
          break;
        case 'credits_50':
          creditsToAdd = 50;
          break;
      }

      // Kredileri ekle
      if (creditsToAdd > 0) {
        await addCredits(creditsToAdd);
      }

      return true;
    } catch (error) {
      console.error('Purchase error:', error);
      return false;
    }
  };

  return {
    packages,
    customerInfo,
    loading,
    purchasePackage,
    refreshPurchases: initializePurchases
  };
}

// components/CreditStore.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { useRevenueCat } from '@/lib/useRevenueCat';
import { useCredits } from '@/lib/useCredits';

export function CreditStore() {
  const { packages, purchasePackage, loading: purchasesLoading } = useRevenueCat();
  const { credits, loading: creditsLoading } = useCredits();

  const handlePurchase = async (pack) => {
    const success = await purchasePackage(pack);
    if (success) {
      Alert.alert('Success', 'Credits added to your account!');
    } else {
      Alert.alert('Error', 'Purchase failed. Please try again.');
    }
  };

  if (purchasesLoading || creditsLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit Store</Text>
      <Text style={styles.credits}>
        Current Credits: {credits?.credits || 0}
      </Text>

      <View style={styles.packages}>
        {packages.map((pack) => (
          <Pressable
            key={pack.identifier}
            style={styles.package}
            onPress={() => handlePurchase(pack)}
          >
            <Text style={styles.packageTitle}>{pack.product.title}</Text>
            <Text style={styles.packagePrice}>{pack.product.priceString}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  credits: {
    fontSize: 18,
    marginBottom: 20,
  },
  packages: {
    gap: 10,
  },
  package: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  packagePrice: {
    fontSize: 16,
    color: '#4CAF50',
  },
});