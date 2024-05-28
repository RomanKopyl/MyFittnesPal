import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Stack } from 'expo-router';
import React from 'react';

const client = new ApolloClient({
    uri: process.env.EXPO_PUBLIC_API_URL,
    cache: new InMemoryCache(),
    headers: {
        Authorization: process.env.EXPO_PUBLIC_API_KEY
    }
});

const RootLayout = () => {
    return (
        <ApolloProvider client={client}>
            <Stack />
        </ApolloProvider>
    );
};

export default RootLayout;