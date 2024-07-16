import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {

    return (
      <GestureHandlerRootView style={{flex: 1,}}>
          <BottomSheetModalProvider>
            <Stack>
                <Stack.Screen name="index"
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="home/index"
                    options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="home/image"
                    options={{
                        headerShown: false,
                        presentation:"transparentModal",
                        animation:"fade"
                    }} />
            </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>

    )
}