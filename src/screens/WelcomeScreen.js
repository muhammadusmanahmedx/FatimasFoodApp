import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Dimensions,
  SafeAreaView 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    // Navigate to MainTabs and prevent going back to Welcome screen
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            {/* Logo/Brand Section */}
            <View style={styles.topSection}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoEmoji}></Text>
                <Text style={styles.logoText}></Text>
              </View>
            </View>

            {/* Content Section */}
            <View style={styles.contentSection}>
              <View style={styles.textContent}>
                <Text style={styles.title}>Fast Delivery</Text>
                <Text style={styles.title}>of Delicious Food</Text>
                <Text style={styles.subtitle}>
                  Order your favorite meals from the best restaurants and get them delivered to your doorstep
                </Text>
              </View>

              {/* Get Started Button */}
              <TouchableOpacity 
                style={styles.button}
                onPress={handleGetStarted}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </TouchableOpacity>

              {/* Indicator */}
              <View style={styles.indicatorContainer}>
                <View style={[styles.indicatorDot, styles.indicatorDotActive]} />
                <View style={styles.indicatorDot} />
                <View style={styles.indicatorDot} />
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 1,
  },
  contentSection: {
    flex: 0.7,
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
    paddingBottom: 50,
  },
  textContent: {
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.white,
    lineHeight: 52,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
    marginTop: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#5CB85C',
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  buttonArrow: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  indicatorDotActive: {
    width: 24,
    backgroundColor: colors.white,
  },
});
