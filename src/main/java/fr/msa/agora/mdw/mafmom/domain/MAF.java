package fr.msa.agora.mdw.mafmom.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A MAF.
 */
@Entity
@Table(name = "maf")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MAF implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "version")
    private String version;

    @Column(name = "publie")
    private Boolean publie;

    @OneToMany(mappedBy = "mAF")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contrat> contrats = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVersion() {
        return version;
    }

    public MAF version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Boolean isPublie() {
        return publie;
    }

    public MAF publie(Boolean publie) {
        this.publie = publie;
        return this;
    }

    public void setPublie(Boolean publie) {
        this.publie = publie;
    }

    public Set<Contrat> getContrats() {
        return contrats;
    }

    public MAF contrats(Set<Contrat> contrats) {
        this.contrats = contrats;
        return this;
    }

    public MAF addContrat(Contrat contrat) {
        this.contrats.add(contrat);
        contrat.setMAF(this);
        return this;
    }

    public MAF removeContrat(Contrat contrat) {
        this.contrats.remove(contrat);
        contrat.setMAF(null);
        return this;
    }

    public void setContrats(Set<Contrat> contrats) {
        this.contrats = contrats;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MAF)) {
            return false;
        }
        return id != null && id.equals(((MAF) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MAF{" +
            "id=" + getId() +
            ", version='" + getVersion() + "'" +
            ", publie='" + isPublie() + "'" +
            "}";
    }
}
