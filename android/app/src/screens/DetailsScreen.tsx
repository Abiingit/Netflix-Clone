import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { movie } = route.params as any;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: movie.image?.original || 'https://via.placeholder.com/300',
        }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.genres}>
        {movie.genres?.join(', ') || 'Genres not available'}
      </Text>
      <Text style={styles.language}>Language: {movie.language}</Text>
      <Text style={styles.rating}>
        Rating: {movie.rating?.average || 'Not Rated'}
      </Text>
      <Text style={styles.status}>Status: {movie.status}</Text>
      <Text style={styles.runtime}>
        Runtime: {movie.runtime ? `${movie.runtime} mins` : 'Unknown'}
      </Text>
      <Text style={styles.premiered}>
        Premiered: {movie.premiered || 'N/A'}
      </Text>
      <Text style={styles.summary}>
        {movie.summary
          ? movie.summary.replace(/<[^>]*>?/gm, '')
          : 'No summary available.'}
      </Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
    flexGrow: 1,
  },
  poster: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  genres: {
    fontSize: 16,
    color: '#E50914',
    textAlign: 'center',
    marginBottom: 5,
  },
  language: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  runtime: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  premiered: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  summary: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    lineHeight: 22,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E50914',
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
