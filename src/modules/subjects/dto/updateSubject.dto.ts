import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateSubjectDto } from "./createSubject.dto";

export class UpdateSubjectDto extends PartialType(
    OmitType(CreateSubjectDto, ['creatorId', 'tasks'] as const)
) {}

export class UpdateSubjectTask extends (OmitType(CreateSubjectDto, ['name', 'description', 'creatorId'] as const)){}