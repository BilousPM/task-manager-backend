import createHttpError from 'http-errors';
import { createCard, deleteCard, updateCard } from '../services/card.js';
import { CardsCollection } from '../db/models/card.js';

export const createCardController = async (req, res) => {
  const card = await createCard(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a card!`,
    data: card,
  });
};

export const deleteCardController = async (req, res, next) => {
  const { cardId } = req.params;
  const card = await deleteCard(cardId, req.user._id);
  if (!card) {
    next(createHttpError(404, 'Card not found'));
    return;
  }

  res.status(204).send();
};

export const patchCardController = async (req, res, next) => {
  const {
    body: { columnId },
    params: { id: _id },
  } = req;
  const { _id: userId } = req.user;

  const result = await CardsCollection.findOneAndUpdate(
    { _id, userId },
    { columnId },
    { new: true },
  );
  if (!result) {
    next(createHttpError(404, 'Card not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a card!`,
    data: result.card,
  });
};

export const upsertCardController = async (req, res, next) => {
  const { cardId } = req.params;

  const result = await updateCard(cardId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Card not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a card!`,
    data: result.card,
  });
};
