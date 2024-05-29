BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Board] (
    [id] NVARCHAR(1000) NOT NULL,
    [orgId] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [imageId] NVARCHAR(1000) NOT NULL,
    [imageThumbUrl] NVARCHAR(1000) NOT NULL,
    [imageFullUrl] NVARCHAR(1000) NOT NULL,
    [imageUserName] NVARCHAR(1000) NOT NULL,
    [imageLinkHTML] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Board_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Board_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[List] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [order] INT NOT NULL,
    [boardId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [List_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [List_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Card] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [order] INT NOT NULL,
    [description] NVARCHAR(1000),
    [listId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Card_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Card_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [List_boardId_idx] ON [dbo].[List]([boardId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Card_listId_idx] ON [dbo].[Card]([listId]);

-- AddForeignKey
ALTER TABLE [dbo].[List] ADD CONSTRAINT [List_boardId_fkey] FOREIGN KEY ([boardId]) REFERENCES [dbo].[Board]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Card] ADD CONSTRAINT [Card_listId_fkey] FOREIGN KEY ([listId]) REFERENCES [dbo].[List]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
