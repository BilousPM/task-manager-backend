import createHttpError from 'http-errors';
import { createCard, deleteCard, updateCard } from '../services/card.js';

// ----- Create  Card -----
export const createCardController = async (req, res) => {
  const {columnId} = req.params;
  const cardData = req.body;
  console.log(cardData);

  const card = await createCard(columnId, cardData);
  console.log(card);
  res.status(201).json({
    status: 201,
    message: `Successfully created a card!`,
    data: card,
  });
};

// ----- Update Card -----
export const patchCardController = async (req, res, next) => {
  const { cardId } = req.params;

  const card = await updateCard(cardId, req.body, {
    upsert: true,
  });

  if (!card)
    throw createHttpError(404, 'Card not found');

  res.status(201).json({
    status: 201,
    message: `Successfully updated a card!`,
    data: card
  });
};

// ----- Replace Column -----
export const replaceColumnController = async (req, res, next) => {
 const cardId = req.params;
 const columnId = req.body;

  const card = await updateCard(cardId, columnId);

  if (!card) {
  throw createHttpError(404, 'Card not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a card!`,
    data: card
  });
};

// ----- Delete Card -----
export const deleteCardController = async (req, res, next) => {
  const { cardId } = req.params;

  const deletedCard = await deleteCard(cardId);
  if (!deletedCard) {
    next(createHttpError(404, 'Card not found'));
    return;
  }

  res.status(204).send();
};





// export const upsertCardController = async (req, res, next) => {
//   const { cardId } = req.params;

//   const result = await updateCard(cardId, req.body, {
//     upsert: true,
//   });

//   if (!result) {
//     next(createHttpError(404, 'Card not found'));
//     return;
//   }

//   const status = result.isNew ? 201 : 200;

//   res.status(status).json({
//     status,
//     message: `Successfully upserted a card!`,
//     data: result.card,
//   });
// };


// export const patchCardController = async (req, res, next) => {
//   const {
//     body: { columnId },
//     params: { id: _id },
//   } = req;
//   const { _id: userId } = req.user;

//   const result = await CardsCollection.findOneAndUpdate(
//     { _id, userId },
//     { columnId },
//     { new: true },
//   );
//   if (!result) {
//     next(createHttpError(404, 'Card not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched a card!`,
//     data: result.card,
//   });
// };
