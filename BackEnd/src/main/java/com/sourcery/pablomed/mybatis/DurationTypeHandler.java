package com.sourcery.pablomed.mybatis;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Duration;
import java.time.LocalTime;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

@MappedTypes(Duration.class)
public class DurationTypeHandler extends BaseTypeHandler<Duration> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i,
                                    Duration parameter, JdbcType jdbcType) throws SQLException {
        ps.setObject(i, parameter);
    }

    private Duration toDuration(String duration) {
        LocalTime time = LocalTime.parse(duration);
        int hours = time.getHour();
        int minutes = time.getMinute();
        return Duration.ofHours(hours).plusMinutes(minutes);
    }

    @Override
    public Duration getNullableResult(ResultSet rs, String visitTime) throws SQLException {
        return toDuration(rs.getString(visitTime));
    }

    @Override
    public Duration getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return toDuration(rs.getString(columnIndex));
    }

    @Override
    public Duration getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return toDuration(cs.getString(columnIndex));
    }
}
