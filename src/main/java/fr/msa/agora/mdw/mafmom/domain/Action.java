package fr.msa.agora.mdw.mafmom.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import fr.msa.agora.mdw.mafmom.domain.enumeration.ActionType;

/**
 * The action entity
 */
@ApiModel(description = "The action entity")
@Entity
@Table(name = "action")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Action implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_action")
    private ActionType typeAction;

    @Column(name = "libelle_action")
    private String libelleAction;

    @OneToOne
    @JoinColumn(unique = true)
    private Contrat contrat;

    @ManyToOne
    @JsonIgnoreProperties("actions")
    private MAFHistory mAFHistory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ActionType getTypeAction() {
        return typeAction;
    }

    public Action typeAction(ActionType typeAction) {
        this.typeAction = typeAction;
        return this;
    }

    public void setTypeAction(ActionType typeAction) {
        this.typeAction = typeAction;
    }

    public String getLibelleAction() {
        return libelleAction;
    }

    public Action libelleAction(String libelleAction) {
        this.libelleAction = libelleAction;
        return this;
    }

    public void setLibelleAction(String libelleAction) {
        this.libelleAction = libelleAction;
    }

    public Contrat getContrat() {
        return contrat;
    }

    public Action contrat(Contrat contrat) {
        this.contrat = contrat;
        return this;
    }

    public void setContrat(Contrat contrat) {
        this.contrat = contrat;
    }

    public MAFHistory getMAFHistory() {
        return mAFHistory;
    }

    public Action mAFHistory(MAFHistory mAFHistory) {
        this.mAFHistory = mAFHistory;
        return this;
    }

    public void setMAFHistory(MAFHistory mAFHistory) {
        this.mAFHistory = mAFHistory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Action)) {
            return false;
        }
        return id != null && id.equals(((Action) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Action{" +
            "id=" + getId() +
            ", typeAction='" + getTypeAction() + "'" +
            ", libelleAction='" + getLibelleAction() + "'" +
            "}";
    }
}
