package com.salesync.rabbitmq.dto;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class MessageDTO {
    String id;

    int age;


}
