import { Alert } from "react-native";

export const createLoadDataService = <T>(fetchFunction: () => T[], errorMessage: string = "Failed to load data") => {
  return (setData: (data: T[]) => void, setIsLoading: (loading: boolean) => void) => {
    try {
      setIsLoading(true);
      const data = fetchFunction();
      setData(data);
    } catch (error) {
      console.error(`Error loading data:`, error);
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
};

export const createDeleteService = <T extends { id: number; name?: string }>(
  deleteFunction: (id: number) => void,
  itemTypeName: string,
  errorMessage?: string
) => {
  return (item: T, onSuccess: () => void) => {
    const itemName = item.name || `${itemTypeName} #${item.id}`;

    Alert.alert(`Delete ${itemTypeName}`, `Are you sure you want to delete "${itemName}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          try {
            deleteFunction(item.id);
            Alert.alert("Success", `${itemTypeName} deleted successfully`);
            onSuccess();
          } catch (error) {
            console.error(`Error deleting ${itemTypeName}:`, error);
            Alert.alert(
              "Error",
              errorMessage || `Failed to delete ${itemTypeName}. It may be linked to other records.`
            );
          }
        },
      },
    ]);
  };
};


export const createRefreshHandler = (
  loadFunction: (setData: any, setIsLoading: any) => void,
  setData: any,
  setIsLoading: any
) => {
  return () => loadFunction(setData, setIsLoading);
};
