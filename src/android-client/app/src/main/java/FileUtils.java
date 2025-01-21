package com.example.android_client;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.OpenableColumns;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

public class FileUtils {
    /**
     * Converts a Uri to a File object.
     *
     * @param context The context.
     * @param uri     The Uri to convert.
     * @return The File object.
     * @throws Exception If the conversion fails.
     */
    public static File getFile(Context context, Uri uri) throws Exception {
        String fileName = getFileName(context, uri);
        File file = new File(context.getCacheDir(), fileName);
        InputStream inputStream = context.getContentResolver().openInputStream(uri);
        if (inputStream == null) throw new Exception("Unable to open input stream.");
        FileOutputStream outputStream = new FileOutputStream(file);
        byte[] buf = new byte[1024];
        int len;
        while ((len = inputStream.read(buf)) > 0) {
            outputStream.write(buf, 0, len);
        }
        outputStream.close();
        inputStream.close();
        return file;
    }

    /**
     * Retrieves the file name from the Uri.
     *
     * @param context The context.
     * @param uri     The Uri.
     * @return The file name.
     */
    private static String getFileName(Context context, Uri uri) {
        String result = null;
        if (uri.getScheme() != null && uri.getScheme().equals("content")) {
            ContentResolver resolver = context.getContentResolver();
            Cursor cursor = resolver.query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    int idx = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                    if (idx >= 0) {
                        result = cursor.getString(idx);
                    }
                }
            } finally {
                if (cursor != null) cursor.close();
            }
        }
        if (result == null) {
            result = uri.getLastPathSegment();
        }
        return result;
    }
}
