import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Delivery {
  id: number;
  driveId: number;
  customerId: number;
  tips: number;
  statut: number;
}

interface DeliveryUpdate {
  id: number;
  updates: Partial<Delivery>;
}

interface DeliveryState {
  deliveries: Delivery[];
}

const initialState: DeliveryState = {
  deliveries: [],
};

const deliverySlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    addDelivery: (state, action: PayloadAction<Delivery>) => {
      state.deliveries.push(action.payload);
    },
    updateDelivery: (state, action: PayloadAction<DeliveryUpdate>) => {
      const { id, updates } = action.payload;
      const existingDelivery = state.deliveries.find((delivery) => delivery.id === id);
      if (existingDelivery) {
        Object.assign(existingDelivery, updates);
      }
    },
    removeDelivery: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.deliveries = state.deliveries.filter((delivery) => delivery.id !== id);
    },
  },
});

export const { addDelivery, updateDelivery, removeDelivery } = deliverySlice.actions;

export default deliverySlice.reducer;