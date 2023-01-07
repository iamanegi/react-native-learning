import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/database";

export default function AddPlace({ navigation }) {
  async function createPlaceHanlder(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHanlder} />;
}
