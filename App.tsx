import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import HelloDom from './components/HelloDom';

// Mount the DOM component after startup (not at cold start), the way a screen opened by navigation does.
export default function App() {
  const [shown, setShown] = useState(false);
  return (
    <View style={styles.container}>
      <Button title={shown ? 'Hide DOM component' : 'Show DOM component'} onPress={() => setShown((v) => !v)} />
      {shown ? <HelloDom dom={{ style: { height: 200 } }} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, paddingTop: 80, backgroundColor: '#fff' } });
