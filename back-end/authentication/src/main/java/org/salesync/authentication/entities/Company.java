package org.salesync.authentication.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.UUID;

@Data
@SuperBuilder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "company")
public class Company {
    @Id
    @Column(name = "company_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    protected UUID companyId;

    @JsonProperty("name")
    @Column(name = "name")
    private String name;

    @JsonProperty("avatar_url")
    @Column(name = "avatar_url")
    @JsonIgnore
    private String avatarUrl;

    @JsonProperty("address")
    @Column(name = "address")
    @JsonIgnore
    private String address;
    
    @JsonProperty("description")
    @Column(name = "description")
    @JsonIgnore
    private String description;

    @JsonProperty("phone")
    @Column(name = "phone")
    @JsonIgnore
    private String phone;

    @JsonProperty("tax_code")
    @Column(name = "tax_code")
    @JsonIgnore
    private String taxCode;
}
