import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window');

export default function WalletScreen({ navigation }) {
  const [balance, setBalance] = useState(2850);
  const [selectedTab, setSelectedTab] = useState('Transactions');

  const transactions = [
    {
      id: 1,
      type: 'payment',
      title: 'Order Payment',
      restaurant: 'Classic Burger & Fries',
      amount: -1200,
      date: '2 hours ago',
      icon: 'restaurant',
      status: 'completed',
    },
    {
      id: 2,
      type: 'topup',
      title: 'Wallet Top-up',
      restaurant: 'Via Credit Card',
      amount: +2000,
      date: 'Today, 10:30 AM',
      icon: 'add-circle',
      status: 'completed',
    },
    {
      id: 3,
      type: 'cashback',
      title: 'Cashback Earned',
      restaurant: 'Pizza Order Reward',
      amount: +150,
      date: 'Yesterday',
      icon: 'gift',
      status: 'completed',
    },
    {
      id: 4,
      type: 'payment',
      title: 'Food Order',
      restaurant: 'Margherita Pizza',
      amount: -850,
      date: 'Yesterday',
      icon: 'fast-food',
      status: 'completed',
    },
    {
      id: 5,
      type: 'refund',
      title: 'Order Refund',
      restaurant: 'Cancelled Order',
      amount: +650,
      date: '2 days ago',
      icon: 'arrow-undo-circle',
      status: 'completed',
    },
  ];

  const quickActions = [
    { id: 1, title: 'Add Money', icon: 'add-circle-outline', color: colors.primary },
    { id: 2, title: 'Send', icon: 'paper-plane-outline', color: '#2196F3' },
    { id: 3, title: 'Pay Bills', icon: 'receipt-outline', color: '#FF9800' },
    { id: 4, title: 'History', icon: 'time-outline', color: '#9C27B0' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>My Wallet</Text>
          <Text style={styles.headerSubtitle}>Food Delivery Balance</Text>
        </View>
        <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>Rs {balance.toLocaleString()}</Text>
            </View>
            <View style={styles.walletIconContainer}>
              <Ionicons name="wallet" size={32} color={colors.primary} />
            </View>
          </View>
          
          <View style={styles.balanceActions}>
            <TouchableOpacity 
              style={styles.balanceActionButton}
              activeOpacity={0.8}
              onPress={() => Alert.alert('Add Money', 'Add money feature')}
            >
              <Ionicons name="add-circle" size={20} color={colors.white} />
              <Text style={styles.balanceActionText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.balanceActionButtonOutline}
              activeOpacity={0.8}
              onPress={() => Alert.alert('Send Money', 'Send money feature')}
            >
              <Ionicons name="paper-plane" size={20} color={colors.primary} />
              <Text style={styles.balanceActionTextOutline}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={styles.quickActionCard}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Offers Banner */}
        <TouchableOpacity style={styles.offerBanner} activeOpacity={0.9}>
          <View style={styles.offerContent}>
            <View style={styles.offerIcon}>
              <Ionicons name="gift" size={24} color={colors.primary} />
            </View>
            <View style={styles.offerText}>
              <Text style={styles.offerTitle}>Cashback Offer!</Text>
              <Text style={styles.offerSubtitle}>Get 10% cashback on your next order</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </View>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Transactions' && styles.activeTab]}
            onPress={() => setSelectedTab('Transactions')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, selectedTab === 'Transactions' && styles.activeTabText]}>
              Transactions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Orders' && styles.activeTab]}
            onPress={() => setSelectedTab('Orders')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, selectedTab === 'Orders' && styles.activeTabText]}>
              Order History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transactions List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id} 
              style={styles.transactionCard}
              activeOpacity={0.7}
            >
              <View style={[
                styles.transactionIcon,
                { backgroundColor: transaction.amount > 0 ? '#E8F5E9' : '#FFF3E0' }
              ]}>
                <Ionicons 
                  name={transaction.icon} 
                  size={24} 
                  color={transaction.amount > 0 ? '#5CB85C' : colors.primary} 
                />
              </View>
              
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionDescription}>{transaction.restaurant}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? '#5CB85C' : colors.text }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}Rs {Math.abs(transaction.amount)}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: transaction.amount > 0 ? '#E8F5E9' : colors.lightGray }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: transaction.amount > 0 ? '#5CB85C' : colors.textLight }
                  ]}>
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  balanceCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  walletIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  balanceActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  balanceActionButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
    gap: 8,
  },
  balanceActionTextOutline: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    alignItems: 'center',
    width: (width - 64) / 4,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  offerBanner: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: colors.primary + '10',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  offerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  offerText: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 13,
    color: colors.textLight,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.text,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.gray,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  bottomSpacer: {
    height: 20,
  },
});
