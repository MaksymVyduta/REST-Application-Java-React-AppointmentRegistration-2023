package com.sourcery.pablomed.mybatis;

import java.util.Optional;
import java.util.UUID;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.MappedTypes;

@MappedTypes(java.util.UUID.class)
public class UuidTypeHandler extends BaseTypeHandler<UUID> {

    @Override
    public void setNonNullParameter(
            java.sql.PreparedStatement ps, int i, UUID parameter,
            org.apache.ibatis.type.JdbcType jdbcType) throws java.sql.SQLException {
        ps.setObject(i, parameter);
    }

    private UUID toUuid(String uuid) {
        return Optional.ofNullable(uuid).map(UUID::fromString).orElse(null);
    }

    @Override
    public UUID getNullableResult(java.sql.ResultSet rs, String columnName) throws java.sql.SQLException {
        return toUuid(rs.getString(columnName));
    }

    @Override
    public UUID getNullableResult(java.sql.ResultSet rs, int columnIndex) throws java.sql.SQLException {
        return toUuid(rs.getString(columnIndex));
    }

    @Override
    public UUID getNullableResult(java.sql.CallableStatement cs, int columnIndex) throws java.sql.SQLException {
        return toUuid(cs.getString(columnIndex));
    }
}
