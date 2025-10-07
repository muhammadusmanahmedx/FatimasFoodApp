import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Juicy beef with cheese',
      price: 600,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      restaurant: 'Burger House',
      deliveryTime: '15-20 min',
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      description: 'Classic Italian pizza',
      price: 850,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
      restaurant: 'Pizza Palace',
      deliveryTime: '25-30 min',
    },
    {
      id: 3,
      name: 'Chicken Wings',
      description: 'Spicy buffalo wings',
      price: 720,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
      restaurant: 'Wing Stop',
      deliveryTime: '15-20 min',
    },
    {
      id: 4,
      name: 'Caesar Salad',
      description: 'Fresh & healthy salad',
      price: 520,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
      restaurant: 'Salad Bar',
      deliveryTime: '10-15 min',
    },
    {
      id: 5,
      name: 'Peri Peri Fries',
      description: 'Crispy golden fries',
      price: 450,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
      restaurant: 'Snack Corner',
      deliveryTime: '10-15 min',
    },
    {
      id: 6,
      name: 'Chowmen Noodles',
      description: 'Asian style noodles',
      price: 650,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
      restaurant: 'Asian Kitchen',
      deliveryTime: '20-25 min',
    },
  ]);

  const removeFavorite = (id) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setFavorites(favorites.filter(item => item.id !== id))
        }
      ]
    );
  };

  const addToCart = (item) => {
    Alert.alert('Added to Cart', `${item.name} has been added to your cart!`);
  };

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
          <Text style={styles.headerTitle}>My Favorites</Text>
          <Text style={styles.headerSubtitle}>{favorites.length} items</Text>
        </View>
        <TouchableOpacity style={styles.searchButton} activeOpacity={0.7}>
          <Ionicons name="search" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {favorites.length === 0 ? (
        // Empty State
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="heart-outline" size={80} color={colors.gray} />
          </View>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start adding your favorite dishes to see them here
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('HomeTab')}
            activeOpacity={0.8}
          >
            <Text style={styles.browseButtonText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Stats Card */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>{favorites.length}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="restaurant" size={24} color="#FFB800" />
              <Text style={styles.statNumber}>
                {new Set(favorites.map(f => f.restaurant)).size}
              </Text>
              <Text style={styles.statLabel}>Restaurants</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="star" size={24} color="#5CB85C" />
              <Text style={styles.statNumber}>
                {(favorites.reduce((sum, f) => sum + f.rating, 0) / favorites.length).toFixed(1)}
              </Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>

          {/* Favorites Grid */}
          <View style={styles.favoritesGrid}>
            {favorites.map((item) => (
              <View key={item.id} style={styles.foodCard}>
                <View style={styles.foodImageContainer}>
                  <Image source={{ uri: item.image }} style={styles.foodImage} />
                  <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={() => removeFavorite(item.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="heart" size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.foodCardContent}>
                  <View style={styles.foodRating}>
                    <Ionicons name="star" size={12} color="#FFB800" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  
                  <Text style={styles.foodName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.foodDescription} numberOfLines={1}>
                    {item.description}
                  </Text>
                  
                  <View style={styles.restaurantInfo}>
                    <Ionicons name="restaurant-outline" size={12} color={colors.gray} />
                    <Text style={styles.restaurantName} numberOfLines={1}>
                      {item.restaurant}
                    </Text>
                  </View>
                  
                  <View style={styles.foodCardFooter}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currencySymbol}>Rs</Text>
                      <Text style={styles.foodPrice}>{item.price}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => addToCart(item)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="add" size={20} color={colors.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
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
  searchButton: {
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
    paddingHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 32,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  browseButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
  favoritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  foodCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  foodImageContainer: {
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.lightGray,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodCardContent: {
    padding: 12,
  },
  foodRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFB800',
    marginLeft: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  foodDescription: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 8,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 11,
    color: colors.gray,
    marginLeft: 4,
    flex: 1,
  },
  foodCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencySymbol: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 2,
  },
  foodPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomSpacer: {
    height: 20,
  },
});
