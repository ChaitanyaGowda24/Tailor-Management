package com.tailor.TailorService.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tailor")
public class Tailor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tailorId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String shopName;

    @Embedded
    private Location location;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String password;

    //private double revenue = 0;

    @Column(columnDefinition = "int default 0")
    private int ordersCount = 0;

    @Column(columnDefinition = "int default 0")
    private int completed = 0;

    @Column(columnDefinition = "varchar(255) default 'open'")
    private String status = "open";

//    @Column(nullable = false)
//    private String isDelivery;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "tailor_id")
    private List<Dress> dress;

    @Column(columnDefinition = "varchar(255) default 'TAILOR'")
    private String role = "TAILOR";

    public Tailor() {
    }

    public Tailor(Long tailorId, String name, String shopName, Location location, String email, String phone, String password, int ordersCount, int completed, String status, List<Dress> dress) {
        this.tailorId = tailorId;
        this.name = name;
        this.shopName = shopName;
        this.location = location;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.ordersCount = ordersCount;
        this.completed = completed;
        this.status = status;
        this.dress = dress;

    }

    public Long getTailorId() {
        return tailorId;
    }

    public void setTailorId(Long tailorId) {
        this.tailorId = tailorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getOrdersCount() {
        return ordersCount;
    }

    public void setOrdersCount(int ordersCount) {
        this.ordersCount = ordersCount;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

//    public String getIsDelivery() {
//        return isDelivery;
//    }
//
//    public void setIsDelivery(String isDelivery) {
//        this.isDelivery = isDelivery;
//    }

    public List<Dress> getDress() {
        return dress;
    }

    public void setDress(List<Dress> dress) {
        this.dress = dress;
    }
}
