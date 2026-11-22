import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { CurrencyPicker } from '@/components/CurrencyPicker';
import { convert, getCurrencies } from '@/services/currencyApi';
import type { Currency } from '@/types/currencyTypes';

export default function Converter() {
  const params = useLocalSearchParams<{ from?: string; to?: string }>();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [amount, setAmount] = useState('10');
  const [from, setFrom] = useState(typeof params.from === 'string' ? params.from : 'EUR');
  const [to, setTo] = useState(typeof params.to === 'string' ? params.to : 'USD');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrencies()
      .then((data) => setCurrencies(data.filter((item) => item.type === 'currency')))
      .catch((err: Error) => setError(err.message));
  }, []);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);

    try {
      const value = await convert(Number(amount), from, to);
      setResult(value);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6 dark:bg-gray-900">
      <Text className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Converter</Text>

      <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">Amount</Text>
      <TextInput
        className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-lg text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
      />

      <View className="mb-4 flex-row gap-3">
        <CurrencyPicker label="From" value={from} currencies={currencies} onSelect={setFrom} />
        <CurrencyPicker label="To" value={to} currencies={currencies} onSelect={setTo} />
      </View>

      <Pressable
        onPress={handleConvert}
        disabled={loading}
        className="items-center rounded-2xl bg-indigo-500 py-4 active:opacity-70">
        <Text className="text-lg font-semibold text-white">
          {loading ? 'Converting...' : 'Convert'}
        </Text>
      </Pressable>

      {error ? <Text className="mt-4 text-red-500 dark:text-red-400">{error}</Text> : null}

      {result !== null ? (
        <View className="mt-6 items-center rounded-2xl bg-gray-100 p-5 dark:bg-gray-800">
          <Text className="text-lg text-gray-500 dark:text-gray-400">
            {amount} {from} =
          </Text>
          <Text className="mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {result.toFixed(2)} {to}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
