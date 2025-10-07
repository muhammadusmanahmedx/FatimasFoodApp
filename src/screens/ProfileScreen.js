import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const profileOptions = [
    {
      id: 1,
      title: 'My Orders',
      subtitle: 'View all your orders',
      icon: 'receipt-outline',
      iconBg: '#FFE5E5',
      iconColor: colors.primary,
      action: () => Alert.alert('My Orders', 'Navigate to orders screen'),
    },
    {
      id: 2,
      title: 'Delivery Address',
      subtitle: 'Manage your addresses',
      icon: 'location-outline',
      iconBg: '#E5F0FF',
      iconColor: '#2196F3',
      action: () => Alert.alert('Addresses', 'Navigate to addresses screen'),
    },
    {
      id: 3,
      title: 'Payment Methods',
      subtitle: 'Manage payment cards',
      icon: 'card-outline',
      iconBg: '#E8F5E9',
      iconColor: '#5CB85C',
      action: () => Alert.alert('Payment', 'Navigate to payment methods'),
    },
    {
      id: 4,
      title: 'Promo Codes',
      subtitle: 'View available offers',
      icon: 'pricetag-outline',
      iconBg: '#FFF9E6',
      iconColor: '#FFB800',
      action: () => Alert.alert('Promo Codes', 'Navigate to promo codes'),
    },
  ];

  const settingsOptions = [
    {
      id: 1,
      title: 'Notifications',
      icon: 'notifications-outline',
      hasSwitch: true,
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      id: 2,
      title: 'Location Services',
      icon: 'location-outline',
      hasSwitch: true,
      value: locationEnabled,
      onToggle: setLocationEnabled,
    },
    {
      id: 3,
      title: 'Language',
      icon: 'language-outline',
      rightText: 'English',
      action: () => Alert.alert('Language', 'Select language'),
    },
    {
      id: 4,
      title: 'Dark Mode',
      icon: 'moon-outline',
      rightText: 'Off',
      action: () => Alert.alert('Dark Mode', 'Toggle dark mode'),
    },
  ];

  const supportOptions = [
    {
      id: 1,
      title: 'Help Center',
      icon: 'help-circle-outline',
      action: () => Alert.alert('Help', 'Navigate to help center'),
    },
    {
      id: 2,
      title: 'Terms & Conditions',
      icon: 'document-text-outline',
      action: () => Alert.alert('Terms', 'View terms and conditions'),
    },
    {
      id: 3,
      title: 'Privacy Policy',
      icon: 'shield-checkmark-outline',
      action: () => Alert.alert('Privacy', 'View privacy policy'),
    },
    {
      id: 4,
      title: 'Rate App',
      icon: 'star-outline',
      action: () => Alert.alert('Rate App', 'Rate us on store'),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => Alert.alert('Logged Out', 'You have been logged out'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => Alert.alert('Edit Profile', 'Edit your profile')}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://ui-avatars.com/api/?name=Fatima+Ahmed&size=200&background=FF6347&color=fff&bold=true' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
              <Ionicons name="camera" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>Fatima Nazir</Text>
          <Text style={styles.userEmail}>fatimanaziir32@email.com</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {profileOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={option.action}
              activeOpacity={0.7}
            >
              <View style={[styles.optionIcon, { backgroundColor: option.iconBg }]}>
                <Ionicons name={option.icon} size={24} color={option.iconColor} />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsOptions.map((option) => (
            <View key={option.id} style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Ionicons name={option.icon} size={22} color={colors.text} />
                </View>
                <Text style={styles.settingTitle}>{option.title}</Text>
              </View>
              {option.hasSwitch ? (
                <Switch
                  value={option.value}
                  onValueChange={option.onToggle}
                  trackColor={{ false: colors.lightGray, true: colors.primary + '40' }}
                  thumbColor={option.value ? colors.primary : colors.gray}
                />
              ) : (
                <TouchableOpacity 
                  style={styles.settingRight}
                  onPress={option.action}
                  activeOpacity={0.7}
                >
                  <Text style={styles.settingRightText}>{option.rightText}</Text>
                  <Ionicons name="chevron-forward" size={20} color={colors.gray} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & About</Text>
          {supportOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.supportCard}
              onPress={option.action}
              activeOpacity={0.7}
            >
              <Ionicons name={option.icon} size={22} color={colors.textLight} />
              <Text style={styles.supportTitle}>{option.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={22} color="#F44336" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>

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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  editButton: {
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
  profileCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  optionCard: {
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
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 13,
    color: colors.textLight,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingRightText: {
    fontSize: 14,
    color: colors.textLight,
    marginRight: 8,
  },
  supportCard: {
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
  supportTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#F44336',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F44336',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});
