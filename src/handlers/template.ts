import axios from "axios";

export interface TemplateResponse {
  id: string;
  name: string;
  createdAt: string;
}

export const getAllTemplate = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https:consoppt-be.onrender.com';
    console.log('Fetching templates from:', `${baseUrl}/admin/templates`);
    
    const response = await axios.get(
      `${baseUrl}/admin/templates`
    );

    console.log('API Response:', response?.data);
    
    // conso Extract the data array from the response
    if (response?.data?.success && response?.data?.data) {
      return response.data.data;
    }
    
    // conso Fallback to direct data if structure is different
    return response?.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// conso Universal user ID
export const UNIVERSAL_USER_ID = "a73822b7-4bc6-4d7e-b1c8-4b57373be0f6";
