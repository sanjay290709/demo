import * as Yup from "yup";

const MilitarySchema = Yup.object().shape({
    militaryBranch: Yup.string().nullable(),
    militaryStartDate: Yup.string().nullable(),
    militaryEndDate: Yup.string().nullable(),
    dischargeRank: Yup.string().nullable(),
    operatedHeavyEquipment: Yup.boolean().nullable(),
    honorableDischarge: Yup.boolean().nullable(),
})

export default MilitarySchema;