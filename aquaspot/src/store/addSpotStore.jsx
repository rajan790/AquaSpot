// src/store/addSpotStore.js
import { createContext, useContext } from "react";
import { supabase } from "../Supabase/supabaseClient"; // adjust path if needed

const defaultStore = {
  form1: {
    name: '',
    source: '',
    address: '',
    description: ''
  },
  form2: {
    coordinates: null,
    features: []
  },
  form3: {
    images: [],
    timing: '24/7',
    waterQuality: 'excellent'
  },
  reset() {
    this.form1 = { name: '', source: '', address: '', description: '' };
    this.form2 = { coordinates: null, features: [] };
    this.form3 = {
      images: [],
      timing: '24/7',
      waterQuality: 'excellent'
    };
  },
  async uploadSpotData(files, navigate) {
    try {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not authenticated.");
      }

      const uploadedUrls = [];

      for (const file of files) {
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const filePath = `spots/${user.email}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("spots")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("spots")
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrlData.publicUrl);
      }
const storedUser = JSON.parse(localStorage.getItem('userProfile'));
const date = new Date().toLocaleDateString('en-IN'); 
const time = new Date().toLocaleTimeString('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});
      // Prepare full data
      const fullData = {
        uid: user.id,
        ...defaultStore.form1,
        ...defaultStore.form2,
        images: uploadedUrls,
        timing: defaultStore.form3.timing,
        waterQuality: defaultStore.form3.waterQuality,
        useremail: storedUser.email,
        username: storedUser.name,
        date:date,
        time:time
      };

      const { error: insertError } = await supabase
        .from("spotsData")
        .insert([fullData]);

      if (insertError) throw insertError;

      defaultStore.reset();
      navigate("/thanks");
    } catch (err) {
      console.error("Upload or DB error:", err.message);
      alert("Failed to save spot. Please try again.");
    }
  }
};

const AddSpotStoreContext = createContext(defaultStore);

export const SpotStoreProvider = ({ children }) => {
  return (
    <AddSpotStoreContext.Provider value={defaultStore}>
      {children}
    </AddSpotStoreContext.Provider>
  );
};

export const useAddSpotStore = () => useContext(AddSpotStoreContext);
