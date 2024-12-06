import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  const renderMovieItem = ({ item }: any) => {
    const { show } = item;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Details', { movie: show })
        }
      >
        <Image
          source={{ uri: show.image?.medium || 'https://via.placeholder.com/150' }}
          style={styles.thumbnail}
        />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{show.name}</Text>
          <Text numberOfLines={3} style={styles.summary}>
            {show.summary ? show.summary.replace(/<[^>]*>?/gm, '') : 'No description available.'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies"
        placeholderTextColor="#888"
        onFocus={() => navigation.navigate('SearchScreen')}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#E50914" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchBar: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  thumbnail: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summary: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default HomeScreen;
