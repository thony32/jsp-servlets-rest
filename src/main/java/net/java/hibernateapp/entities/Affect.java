package net.java.hibernateapp.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Date;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "affects")
public class Affect {
    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "code_employee", referencedColumnName = "code_employee")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "code_place", referencedColumnName = "code_place")
    private Place place;

    @Column(name = "date")
    private Date date;
}
