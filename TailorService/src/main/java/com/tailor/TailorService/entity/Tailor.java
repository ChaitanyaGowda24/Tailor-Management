package com.tailor.TailorService.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@Entity
@Table(name = "tailor")
public class Tailor {

    @Id
    @GeneratedValue(generator = "custom-id-generator-reverse-date")
    @GenericGenerator(name = "custom-id-generator-reverse-date", strategy = "com.tailor.TailorService.entity.CustomIdGeneratorReverseDate")
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


    @Column(columnDefinition = "varchar(255) default 'open'")
    private String status = "open";


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    @JoinColumn(name = "tailor_id")
    private List<Dress> dress;

    @Column(columnDefinition = "varchar(255) default 'TAILOR'")
    private String role = "TAILOR";

    public Tailor() {
    }

    public Tailor(Long tailorId, String name, String shopName, Location location, String email, String phone, String password,String status, List<Dress> dress) {
        this.tailorId = tailorId;
        this.name = name;
        this.shopName = shopName;
        this.location = location;
        this.email = email;
        this.phone = phone;
        this.password = password;
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
