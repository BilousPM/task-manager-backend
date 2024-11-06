import { CardsCollection } from '../db/models/card.js';

export const createCard = async (payload) => {
  const card = await CardsCollection.create(payload);
  return card;
};

export const deleteCard = async (cardId, userId) => {
  const card = await CardsCollection.findOneAndDelete({
    _id: cardId,
    userId,
  });
  return card;
};

export const updateCard = async (cardId, userId, payload, options = {}) => {
  const rawResult = await CardsCollection.findOneAndUpdate(
    { _id: cardId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    card: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
