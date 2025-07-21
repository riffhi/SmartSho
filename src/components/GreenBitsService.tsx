// Frontend service to interact with GreenBits API
class GreenBitsService {
  static BASE_URL = 'https://smartsho-1.onrender.com/api/greenbits';

  // Get user's GreenBits balance and history
  static async getUserGreenBits(userId) {
    try {
      const response = await fetch(`${this.BASE_URL}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch GreenBits data');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching GreenBits:', error);
      throw error;
    }
  }

  // Redeem GreenBits for rewards - Updated to match backend API
  static async redeemGreenBits(userId, amount, description) {
    try {
      const response = await fetch(`${this.BASE_URL}/redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount,
          redemptionType: 'reward',
          reference: description
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to redeem GreenBits');
      }
      
      return {
        newBalance: result.newBalance,
        transactionId: result.transactionId
      };
    } catch (error) {
      console.error('Error redeeming GreenBits:', error);
      throw error;
    }
  }

  // Add GreenBits (for packaging returns)
  static async addGreenBits(userId, amount, description) {
    try {
      const response = await fetch(`${this.BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount,
          description
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to add GreenBits');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error adding GreenBits:', error);
      throw error;
    }
  }
}

export default GreenBitsService;