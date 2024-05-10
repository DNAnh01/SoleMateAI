import logging

import colorlog


def setup_logger() -> logging.Logger:
    logger = colorlog.getLogger(__name__)

    # Only add handlers if the logger doesn't have any
    if not logger.handlers:
        handler = colorlog.StreamHandler()
        handler.setFormatter(
            colorlog.ColoredFormatter(
                "%(log_color)s%(levelname)s:%(name)s:%(pathname)s:%(funcName)s:%(lineno)d:%(message)s",
                log_colors={
                    "DEBUG": "cyan",
                    "INFO": "green",
                    "WARNING": "yellow",
                    "ERROR": "red",
                    "CRITICAL": "red,bg_white",
                    "EXCEPTION": "purple",
                },
            )
        )
        logger.addHandler(handler)
        logger.setLevel(logging.DEBUG)

    return logger
