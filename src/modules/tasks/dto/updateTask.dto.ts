import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateTaskDto } from "./createTask.dto";

export class UpdateTaskDto extends PartialType(
    OmitType(CreateTaskDto, ['subjectId'] as const)
) {}