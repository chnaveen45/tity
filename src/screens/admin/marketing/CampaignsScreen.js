import { ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { campaigns } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import ListItem from '../../../components/admin/ListItem';

export default function CampaignsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Campaigns" subtitle="Manage promotional campaigns" />

      {campaigns.map((campaign) => (
        <ListItem
          key={campaign.id}
          title={campaign.name}
          subtitle={`${campaign.startDate} → ${campaign.endDate}`}
          rightText={campaign.discount}
          status={campaign.status === 'scheduled' ? 'pending' : campaign.status}
        />
      ))}
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
