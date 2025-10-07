import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window');

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Chowmen Noodles',
      description: 'Spicy Asian style noodles',
      quantity: 1,
      price: 650,
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
    },
    {
      id: 2,
      name: 'Peri Peri Fries',
      description: 'Crispy golden fries',
      quantity: 2,
      price: 425,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    },
    {
      id: 3,
      name: 'Classic Burger',
      description: 'Juicy beef with cheese',
      quantity: 1,
      price: 650,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    },
  ]);

  const [promoCode, setPromoCode] = useState('TASTY10');
  const [isPromoApplied, setIsPromoApplied] = useState(true);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => setCartItems(cartItems.filter(item => item.id !== id))
        }
      ]
    );
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'TASTY10') {
      setIsPromoApplied(true);
      Alert.alert('Success!', '10% discount applied successfully');
    } else {
      setIsPromoApplied(false);
      Alert.alert('Invalid Code', 'Please enter a valid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 100;
  const discount = isPromoApplied ? subtotal * 0.10 : 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Enhanced Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSubtitle}>{cartItems.length} items</Text>
        </View>
        <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        // Empty Cart State
        <View style={styles.emptyCart}>
          <View style={styles.emptyCartIcon}>
            <Ionicons name="cart-outline" size={80} color={colors.gray} />
          </View>
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtitle}>Add items to get started</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Cart Items */}
            <View style={styles.cartItemsSection}>
              {cartItems.map((item, index) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemDescription} numberOfLines={1}>
                      {item.description}
                    </Text>
                    
                    <View style={styles.itemFooter}>
                      <Text style={styles.itemPrice}>Rs {item.price}</Text>
                      
                      {/* Quantity Controls */}
                      <View style={styles.quantityControl}>
                        <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="remove" size={16} color={colors.white} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="add" size={16} color={colors.white} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Promo Code Section */}
            <View style={styles.promoSection}>
              <Text style={styles.promoTitle}>Have a promo code?</Text>
              <View style={styles.promoContainer}>
                <View style={styles.promoInputWrapper}>
                  <Ionicons name="pricetag-outline" size={20} color={colors.gray} />
                  <TextInput
                    style={styles.promoInput}
                    value={promoCode}
                    onChangeText={setPromoCode}
                    placeholder="Enter promo code"
                    placeholderTextColor={colors.gray}
                  />
                </View>
                <TouchableOpacity 
                  style={styles.applyButton}
                  onPress={applyPromoCode}
                  activeOpacity={0.8}
                >
                  {isPromoApplied ? (
                    <Ionicons name="checkmark-circle" size={24} color="#5CB85C" />
                  ) : (
                    <Text style={styles.applyButtonText}>Apply</Text>
                  )}
                </TouchableOpacity>
              </View>
              {isPromoApplied && (
                <View style={styles.discountBanner}>
                  <Ionicons name="checkmark-circle" size={16} color="#5CB85C" />
                  <Text style={styles.discountText}>10% discount applied!</Text>
                </View>
              )}
            </View>

            {/* Price Breakdown */}
            <View style={styles.priceBreakdown}>
              <Text style={styles.breakdownTitle}>Order Summary</Text>
              
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Subtotal</Text>
                <Text style={styles.priceValue}>Rs {subtotal.toLocaleString()}</Text>
              </View>
              
              <View style={styles.priceRow}>
                <View style={styles.priceLabelWithIcon}>
                  <Ionicons name="bicycle-outline" size={16} color={colors.textLight} />
                  <Text style={styles.priceLabel}>Delivery Fee</Text>
                </View>
                <Text style={styles.priceValue}>Rs {deliveryFee}</Text>
              </View>
              
              {isPromoApplied && (
                <View style={styles.priceRow}>
                  <View style={styles.priceLabelWithIcon}>
                    <Ionicons name="pricetag-outline" size={16} color="#5CB85C" />
                    <Text style={[styles.priceLabel, { color: '#5CB85C' }]}>Discount</Text>
                  </View>
                  <Text style={[styles.priceValue, { color: '#5CB85C' }]}>
                    - Rs {discount.toLocaleString()}
                  </Text>
                </View>
              )}
              
              <View style={styles.divider} />
              
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>Rs {total.toLocaleString()}</Text>
              </View>
            </View>

            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* Checkout Button */}
          <View style={styles.checkoutContainer}>
            <View style={styles.checkoutSummary}>
              <Text style={styles.checkoutSummaryLabel}>Total Amount</Text>
              <Text style={styles.checkoutSummaryPrice}>Rs {total.toLocaleString()}</Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => Alert.alert('Success', 'Proceeding to checkout...')}
              activeOpacity={0.85}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    paddingBottom: 20,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 32,
    textAlign: 'center',
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  shopButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  cartItemsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginRight: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  promoInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
    padding: 0,
  },
  applyButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  discountBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  discountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5CB85C',
    marginLeft: 8,
  },
  priceBreakdown: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 15,
    color: colors.textLight,
    marginLeft: 6,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  bottomSpacer: {
    height: 20,
  },
  checkoutContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  checkoutSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkoutSummaryLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  checkoutSummaryPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  checkoutButton: {
    backgroundColor: '#5CB85C',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5CB85C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginRight: 8,
  },
});
