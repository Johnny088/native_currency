import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { getCurrencies } from '@/services/currencyApi';
import type { Currency } from '@/types/currencyTypes';

export default function Rates() {
  const router = useRouter();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrencies()
      .then((data) => setCurrencies(data.filter((item) => item.type === 'currency')))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-gray-500 dark:text-gray-400">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-red-500 dark:text-red-400">Failed: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <FlatList
        data={currencies}
        keyExtractor={(item) => item.iso_code}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/converter',
                params: { from: item.iso_code, to: 'USD' },
              })
            }
            className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3 active:bg-gray-100 dark:border-gray-700 dark:active:bg-gray-800">
            <Text className="w-12 text-base font-bold text-gray-900 dark:text-gray-100">
              {item.iso_code}
            </Text>
            <Text className="flex-1 text-sm text-gray-500 dark:text-gray-400">{item.name}</Text>
            <Text className="ml-3 text-lg text-gray-400 dark:text-gray-500">→</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
