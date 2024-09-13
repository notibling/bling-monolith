/**
 * 
 * id: { type: 'integer' },
        entityId: { type: 'integer' },
        displayOwner: { type: 'integer' },
        revenuePercentage: { type: 'integer' },
        expirationDate: { type: 'string' },
        entity: { type: 'string' },


        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        deletedAt: { type: 'string' },
 */
export interface IService {
  id: number;
  entityId: number;
  displayOwner: number;
  revenuePercentage: number;
  expirationDate: string;
  entity: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}