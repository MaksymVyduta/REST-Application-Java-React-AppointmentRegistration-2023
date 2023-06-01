package com.sourcery.pablomed.config;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;

class OptionalAwareObjectFactory extends DefaultObjectFactory {
    @Override
    public <T> T create(Class<T> type, List<Class<?>> constructorArgTypes, List<Object> constructorArgs) {
        if (UUID.class.isAssignableFrom(type)) {
            return type.cast(convertByteArray((byte[]) constructorArgs.get(0)));
        } else {
            return super.create(type, constructorArgTypes, constructorArgs);
        }
    }

    private static UUID convertByteArray(byte[] bytes) {
        if (bytes.length == 36) {
            return convertAsciiBytesToUuid(bytes);
        } else {
            return convertBytesToUuid(bytes);
        }
    }

    private static UUID convertAsciiBytesToUuid(byte[] bytes) {
        return UUID.fromString(new String(bytes, StandardCharsets.US_ASCII));
    }

    private static UUID convertBytesToUuid(byte[] bytes) {
        ByteBuffer byteBuffer = ByteBuffer.wrap(bytes);
        long high = byteBuffer.getLong();
        long low = byteBuffer.getLong();
        return new UUID(high, low);
    }
}