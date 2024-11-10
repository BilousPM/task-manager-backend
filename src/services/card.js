import { CardsCollection } from '../db/models/card.js';

// ----- Create Card -----
export const createCard = (columnId, cardData ) =>
  CardsCollection.create({...cardData,columnId});


// ----- Get Cards By Column ID -----
export const getCardsByColumnId = (columnId) =>
  CardsCollection.find({columnId});

// ----- Update Card -----
export const updateCard = (cardId, payload) =>
  CardsCollection.findOneAndUpdate(
  { _id: cardId},
    payload,
  {new: true},
);

// ----- Delete Card -----
export const deleteCard = (cardId) =>
CardsCollection.findOneAndDelete({
    _id: cardId,
  });

// ----- Delete Many Cards By Column Id -----

export const deleteCardsById = (columnId) =>
  CardsCollection.deleteMany({columnId});



// export const updateCard = async (cardId, userId, payload, options = {}) => {
//   const rawResult = await CardsCollection.findOneAndUpdate(
//     { _id: cardId, userId },
//     payload,
//     {
//       new: true,
//       includeResultMetadata: true,
//       ...options,
//     },
//   );

//   if (!rawResult || !rawResult.value) return null;

//   return {
//     card: rawResult.value,
//     isNew: Boolean(rawResult?.lastErrorObject?.upserted),
//   };
// };
