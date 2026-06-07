import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}

export async function createEditCabin(newCabin, id = null) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  let imagePath;
  let imageName;

  // If its editing a cabin and didnt change the image, just use the already setted url from image
  if (hasImagePath) {
    imageName = newCabin.image.split('/').at(-1);
    imagePath = newCabin.image;
  } else {
    // else, if its a new cabin or changed the already existing image, use the file information and create a new image path
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. Create/edit cabin
  let query = supabase.from('cabins');

  // EDIT
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }
  // CREATE
  else {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // 2. Upload images if an image was selected
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin if theres an error uploading the image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not created'
      );
    }
  }

  return data;
}
