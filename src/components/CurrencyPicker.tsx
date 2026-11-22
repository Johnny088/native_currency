import { useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';

import type { Currency } from '@/types/currencyTypes';

interface CurrencyPickerProps {
  label: string;
  value: string;
  currencies: Currency[];
  onSelect: (code: string) => void;
}

export const CurrencyPicker = ({ label, value, currencies, onSelect }: CurrencyPickerProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (code: string) => {
    onSelect(code);
    setOpen(false);
  };

  return (
    <View className="flex-1">
      <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">{label}</Text>

      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800">
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</Text>
        <Text className="text-gray-400 dark:text-gray-500">▼</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 justify-end bg-black/40" onPress={() => setOpen(false)}>
          <Pressable className="max-h-[70%] rounded-t-3xl bg-white p-4 dark:bg-gray-900">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Select {label.toLowerCase()}
              </Text>
              <Pressable onPress={() => setOpen(false)} className="px-2 py-1">
                <Text className="text-lg text-gray-500 dark:text-gray-400">✕</Text>
              </Pressable>
            </View>

            <FlatList
              data={currencies}
              keyExtractor={(item) => item.iso_code}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelect(item.iso_code)}
                  className={`flex-row items-center justify-between rounded-xl px-3 py-3 ${
                    item.iso_code === value
                      ? 'bg-indigo-50 dark:bg-indigo-900/40'
                      : 'active:bg-gray-100 dark:active:bg-gray-800'
                  }`}>
                  <Text className="w-12 font-bold text-gray-900 dark:text-gray-100">
                    {item.iso_code}
                  </Text>
                  <Text className="flex-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
