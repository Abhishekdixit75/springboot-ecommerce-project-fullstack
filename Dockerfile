FROM ubuntu:latest
LABEL authors="abhis"

ENTRYPOINT ["top", "-b"]