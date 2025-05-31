/*
  Warnings:

  - Added the required column `title` to the `Pdf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Png` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pdf" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    CONSTRAINT "Pdf_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pdf" ("file_name", "id", "user_id") SELECT "file_name", "id", "user_id" FROM "Pdf";
DROP TABLE "Pdf";
ALTER TABLE "new_Pdf" RENAME TO "Pdf";
CREATE TABLE "new_Png" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    CONSTRAINT "Png_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Png" ("file_name", "id", "user_id") SELECT "file_name", "id", "user_id" FROM "Png";
DROP TABLE "Png";
ALTER TABLE "new_Png" RENAME TO "Png";
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("body", "id", "title", "user_id") SELECT "body", "id", "title", "user_id" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
