const inventorySchema = require('../schemas/inventory');

exports.GetAllInventories = async () => {
    return await inventorySchema.find({}).populate('product');
};

exports.GetInventoryById = async (id) => {
    return await inventorySchema.findById(id).populate('product');
};

exports.AddStock = async (productId, quantity) => {
    return await inventorySchema.findOneAndUpdate(
        { product: productId },
        { $inc: { stock: quantity } },
        { new: true, upsert: true }
    );
};

exports.RemoveStock = async (productId, quantity) => {
    const inventory = await inventorySchema.findOne({ product: productId });
    if (!inventory || inventory.stock < quantity) {
        throw new Error('Số lượng tồn kho không đủ');
    }
    inventory.stock -= quantity;
    return await inventory.save();
};

exports.Reservation = async (productId, quantity) => {
    const inventory = await inventorySchema.findOne({ product: productId });
    if (!inventory || inventory.stock < quantity) {
        throw new Error('Số lượng tồn kho không đủ để đặt trước');
    }
    inventory.stock -= quantity;
    inventory.reserved += quantity;
    return await inventory.save();
};

exports.Sold = async (productId, quantity) => {
    const inventory = await inventorySchema.findOne({ product: productId });
    if (!inventory || inventory.reserved < quantity) {
        throw new Error('Số lượng đặt trước không đủ để bán');
    }
    inventory.reserved -= quantity;
    inventory.soldCount += quantity;
    return await inventory.save();
};
