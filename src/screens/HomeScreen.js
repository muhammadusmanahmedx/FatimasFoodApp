import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/colors';


export default function HomeScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Delivery');

  const foodItems = [
    {
      id: 1,
      name: 'Classic Burger',
      price: 600,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    },
    {
      id: 2,
      name: 'Peri Peri Fries',
      price: 450,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    },
    {
      id: 3,
      name: 'Mildy Wrap',
      price: 580,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
    },
  ];

  const categories = [
    {
      id: 1,
      name: 'Prepared Food',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
    },
    {
      id: 2,
      name: 'Poultry',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <View>
            <Text style={styles.deliveryLabel}>Express Delivery</Text>
            <Text style={styles.address}>Street 2, House 156</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Delivery' && styles.activeTab]}
            onPress={() => setSelectedTab('Delivery')}
          >
            <Text style={[styles.tabText, selectedTab === 'Delivery' && styles.activeTabText]}>
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Shop' && styles.activeTab]}
            onPress={() => setSelectedTab('Shop')}
          >
            <Text style={[styles.tabText, selectedTab === 'Shop' && styles.activeTabText]}>
              Shop
            </Text>
          </TouchableOpacity>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800' }}
            style={styles.promoImage}
          />
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Level 2 - June</Text>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>8% on your favourite product</Text>
            </View>
            <View style={styles.promoBounces}>
              <Text style={styles.promoBouncesText}>1,300 bounces</Text>
            </View>
          </View>
        </View>

        {/* Novelties Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Novelties of the week</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {foodItems.map((item) => (
            <View key={item.id} style={styles.foodCard}>
              <TouchableOpacity style={styles.favoriteButton}>
                <Text style={styles.favoriteIcon}>🤍</Text>
              </TouchableOpacity>
              <Image source={{ uri: item.image }} style={styles.foodImage} />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {item.rating}</Text>
              </View>
              <Text style={styles.foodName}>{item.name}</Text>
              <View style={styles.foodFooter}>
                <TouchableOpacity style={styles.minusButton}>
                  <Text style={styles.minusText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.foodPrice}>Rs {item.price}</Text>
                <TouchableOpacity style={styles.plusButton}>
                  <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  deliveryLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  address: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 26,
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
    fontSize: 15,
    fontWeight: '600',
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.text,
  },
  promoBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 140,
  },
  promoImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  promoContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    justifyContent: 'space-between',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  promoTag: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  promoTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  promoBounces: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  promoBouncesText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: '#5CB85C',
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  foodCard: {
    width: 140,
    marginRight: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  foodImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: colors.lightGray,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 78,
    left: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  foodFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  minusButton: {
    width: 28,
    height: 28,
    backgroundColor: colors.text,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '300',
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  plusButton: {
    width: 28,
    height: 28,
    backgroundColor: colors.text,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '300',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  categoryOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  bottomSpacer: {
    height: 20,
  },
});