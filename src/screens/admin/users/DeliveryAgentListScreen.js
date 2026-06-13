import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { deliveryAgents } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import SearchBar from '../../../components/admin/SearchBar';
import FilterChips from '../../../components/admin/FilterChips';
import ListItem from '../../../components/admin/ListItem';
import EmptyState from '../../../components/admin/EmptyState';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

export default function DeliveryAgentListScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return deliveryAgents.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.zone.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || a.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Delivery Agents" subtitle="Manage delivery personnel" />
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search agents..." />
      <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />

      {filtered.length === 0 ? (
        <EmptyState message="No delivery agents found" />
      ) : (
        filtered.map((agent) => (
          <ListItem
            key={agent.id}
            title={agent.name}
            subtitle={`${agent.zone} · ${agent.phone}`}
            rightText={`${agent.deliveries} deliveries`}
            status={agent.status}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
});
