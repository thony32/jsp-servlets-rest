package net.java.hibernateapp.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
// import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Date;

@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Table(name = "affects")
public class Affect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    // NOTE: NoArgsContructor
    // public Affect() {}

    public Affect(Integer id, Employee employee, Place place, Date date) {
        this.id = id;
        this.employee = employee;
        this.place = place;
        this.date = date;
    }

}
