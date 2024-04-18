import { createStackNavigator } from "@react-navigation/stack";

import CreateScreen from "../screens/create-screen";
import PreviewScreen from "../screens/preview-screen";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create-screen" component={CreateScreen} />
      <Stack.Screen name="preview-screen" component={PreviewScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
