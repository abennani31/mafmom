package fr.msa.agora.mdw.mafmom.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import fr.msa.agora.mdw.mafmom.domain.enumeration.EtatQueue;

/**
 * The Contrat entity.
 */
@ApiModel(description = "The Contrat entity.")
@Entity
@Table(name = "contrat")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contrat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Column(name = "queue_name")
    private String queueName;

    @Column(name = "date_demande")
    private Instant dateDemande;

    @Enumerated(EnumType.STRING)
    @Column(name = "etat_queue")
    private EtatQueue etatQueue;

    @ManyToOne
    @JsonIgnoreProperties("contrats")
    private MAF mAF;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQueueName() {
        return queueName;
    }

    public Contrat queueName(String queueName) {
        this.queueName = queueName;
        return this;
    }

    public void setQueueName(String queueName) {
        this.queueName = queueName;
    }

    public Instant getDateDemande() {
        return dateDemande;
    }

    public Contrat dateDemande(Instant dateDemande) {
        this.dateDemande = dateDemande;
        return this;
    }

    public void setDateDemande(Instant dateDemande) {
        this.dateDemande = dateDemande;
    }

    public EtatQueue getEtatQueue() {
        return etatQueue;
    }

    public Contrat etatQueue(EtatQueue etatQueue) {
        this.etatQueue = etatQueue;
        return this;
    }

    public void setEtatQueue(EtatQueue etatQueue) {
        this.etatQueue = etatQueue;
    }

    public MAF getMAF() {
        return mAF;
    }

    public Contrat mAF(MAF mAF) {
        this.mAF = mAF;
        return this;
    }

    public void setMAF(MAF mAF) {
        this.mAF = mAF;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contrat)) {
            return false;
        }
        return id != null && id.equals(((Contrat) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Contrat{" +
            "id=" + getId() +
            ", queueName='" + getQueueName() + "'" +
            ", dateDemande='" + getDateDemande() + "'" +
            ", etatQueue='" + getEtatQueue() + "'" +
            "}";
    }
}
