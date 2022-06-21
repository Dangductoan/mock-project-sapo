package com.sapo.mockproject.repository.impl;

import com.sapo.mockproject.domain.Bill;
import com.sapo.mockproject.repository.custom.CustomBillRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Map;

@Repository
public class CustomBillRepositoryImpl implements CustomBillRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Bill> filter(Map<String, String> requestParams, Integer page, Integer size) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT b FROM Bill b INNER JOIN b.customer c INNER JOIN b.billCategory bc");

        appendFilterQuery(requestParams, sql);
        if (requestParams.containsKey("query"))
            appendSearchQuery(requestParams.get("query"), sql);
        if (sql.indexOf("AND") > 0) {
            sql.replace(sql.indexOf("AND"), sql.indexOf("AND") + 3, "WHERE");
        } else if (requestParams.containsKey("query"))
            sql.replace(sql.indexOf("OR"), sql.indexOf("OR") + 2, "WHERE");
        sql.append(" ORDER BY b.id DESC");

        Query query = entityManager.createQuery(sql.toString(), Bill.class);
        query.setFirstResult(page * size);
        query.setMaxResults(size);

        return query.getResultList();
    }

    @Override
    public List<Bill> filter(Map<String, String> requestParams) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT b FROM Bill b INNER JOIN b.customer c INNER JOIN b.billCategory bc");

        appendFilterQuery(requestParams, sql);
        if (requestParams.containsKey("query"))
            appendSearchQuery(requestParams.get("query"), sql);
        if (sql.indexOf("AND") > 0) {
            sql.replace(sql.indexOf("AND"), sql.indexOf("AND") + 3, "WHERE");
        } else if (requestParams.containsKey("query"))
            sql.replace(sql.indexOf("OR"), sql.indexOf("OR") + 2, "WHERE");
        sql.append(" ORDER BY b.id DESC");

        Query query = entityManager.createQuery(sql.toString(), Bill.class);

        return query.getResultList();
    }

    @Override
    public Long countFilter(Map<String, String> requestParams) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT COUNT(b.id) FROM Bill b INNER JOIN b.customer c INNER JOIN b.billCategory bc");

        appendFilterQuery(requestParams, sql);
        if (requestParams.containsKey("query"))
            appendSearchQuery(requestParams.get("query"), sql);
        if (sql.indexOf("AND") > 0) {
            sql.replace(sql.indexOf("AND"), sql.indexOf("AND") + 3, "WHERE");
        } else if (requestParams.containsKey("query"))
            sql.replace(sql.indexOf("OR"), sql.indexOf("OR") + 2, "WHERE");

        Query query = entityManager.createQuery(sql.toString());

        return (Long) query.getSingleResult();
    }

    private void appendFilterQuery(Map<String, String> requestParams, StringBuilder sql) {
        if (requestParams.containsKey("customerId"))
            sql.append(" AND c.id = ").append(requestParams.get("customerId"));
        if (requestParams.containsKey("billCategoryId"))
            sql.append(" AND bc.id = ").append(requestParams.get("billCategoryId"));
        if (requestParams.containsKey("payment"))
            sql.append(" AND b.payment = ").append("'").append(requestParams.get("payment")).append("'");
        if (requestParams.containsKey("createdBy"))
            sql.append(" AND b.createdBy = ").append("'").append(requestParams.get("createdBy")).append("'");
        if (requestParams.containsKey("start") && requestParams.containsKey("end")) {
            sql.append(" AND DATE(b.createdAt) BETWEEN ").append("'").append(requestParams.get("start")).append("'")
                    .append(" AND ").append("'").append(requestParams.get("end")).append("'");
        }
    }

    private void appendSearchQuery(String query, StringBuilder sql) {
        sql.append(" OR b.payment LIKE ").append("'%").append(query).append("%'")
                .append(" OR b.code LIKE ").append("'%").append(query).append("%'")
                .append(" OR b.createdBy LIKE ").append("'%").append(query).append("%'")
                .append(" OR bc.name LIKE ").append("'%").append(query).append("%'")
                .append(" OR c.name LIKE ").append("'%").append(query).append("%'");
    }
}
