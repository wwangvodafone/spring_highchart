package com.example.demo.dao;

import com.example.demo.entity.AiScore;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
@Transactional
public class AiScoreDaoJpql implements AiScoreDao<AiScore>{
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public AiScoreDaoJpql(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }
    @Override
    public List<AiScore> getAll(){
            String sql = "SELECT * FROM ai_score";
            List<AiScore> l = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AiScore.class));
            return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AiScore.class));
    }

    @Override
    public List<AiScore> getWhereRrancAndRule(int tranc, int rule) {
        String sql = "SELECT * FROM ai_score where tranc=" + tranc + " AND rule=" + rule;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AiScore.class));
    }

}
